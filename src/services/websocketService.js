// src/services/websocketService.js
class WebSocketService {
    constructor() {
      this.socket = null;
      this.listeners = new Map();
      this.connected = false;
      this.reconnectAttempts = 0;
      this.maxReconnectAttempts = 5;
      this.reconnectInterval = 3000; // 3 seconds
    }
  
    connect(url = 'wss://shipment-tracking-api.example.com/ws') {
      // For local development/testing, we'll use a mock implementation
      if (process.env.NODE_ENV === 'development') {
        this.mockWebSocket();
        return;
      }
      
      this.socket = new WebSocket(url);
      
      this.socket.onopen = () => {
        console.log('WebSocket connection established');
        this.connected = true;
        this.reconnectAttempts = 0;
        this.notifyListeners('connection', { status: 'connected' });
      };
      
      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.notifyListeners(data.type, data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
      
      this.socket.onclose = (event) => {
        this.connected = false;
        console.log(`WebSocket connection closed: ${event.code} ${event.reason}`);
        this.notifyListeners('connection', { status: 'disconnected' });
        
        // Attempt to reconnect
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++;
          setTimeout(() => this.connect(url), this.reconnectInterval);
        }
      };
      
      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.notifyListeners('error', { error });
      };
    }
    
    // Mock WebSocket for development and testing
    mockWebSocket() {
      console.log('Using mock WebSocket for development');
      this.connected = true;
      
      // Simulate connection event
      setTimeout(() => {
        this.notifyListeners('connection', { status: 'connected' });
      }, 1000);
      
      // Simulate periodic shipment updates
      setInterval(() => {
        const mockStatuses = ['in-transit', 'delivered', 'delayed'];
        const randomStatus = mockStatuses[Math.floor(Math.random() * mockStatuses.length)];
        const randomId = `SHP-${1001 + Math.floor(Math.random() * 5)}`;
        
        this.notifyListeners('shipment_update', {
          type: 'shipment_update',
          shipmentId: randomId,
          status: randomStatus,
          timestamp: new Date().toISOString(),
          location: 'Random City, State',
        });
      }, 10000); // Send a mock update every 10 seconds
    }
    
    subscribe(eventType, callback) {
      if (!this.listeners.has(eventType)) {
        this.listeners.set(eventType, []);
      }
      
      this.listeners.get(eventType).push(callback);
      
      // Return an unsubscribe function
      return () => {
        const callbacks = this.listeners.get(eventType);
        const index = callbacks.indexOf(callback);
        if (index !== -1) {
          callbacks.splice(index, 1);
        }
      };
    }
    
    notifyListeners(eventType, data) {
      if (this.listeners.has(eventType)) {
        this.listeners.get(eventType).forEach(callback => {
          callback(data);
        });
      }
    }
    
    disconnect() {
      if (this.socket && this.connected) {
        this.socket.close();
      }
    }
    
    send(data) {
      if (this.socket && this.connected) {
        this.socket.send(JSON.stringify(data));
      } else {
        console.warn('Cannot send message: WebSocket is not connected');
      }
    }
  }
  
  // Create a singleton instance
  const websocketService = new WebSocketService();
  
  export default websocketService;