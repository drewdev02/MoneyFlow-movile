import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useLogger } from '../hooks/use-logger';


interface NetworkContextType {
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
  type: string | null;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export const NetworkProvider = ({ children }: PropsWithChildren) => {
  const [networkState, setNetworkState] = useState<NetInfoState | null>(null);
  const logger = useLogger("NetworkProvider");

  useEffect(() => {
    logger.debug('Initializing NetworkProvider');
    
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      logger.debug('Network state changed', { 
        isConnected: state.isConnected, 
        type: state.type,
        isInternetReachable: state.isInternetReachable 
      });
      setNetworkState(state);
    });

    // Initial check
    NetInfo.fetch().then((state) => {
      logger.info('Initial network state fetched', { 
        isConnected: state.isConnected, 
        type: state.type 
      });
      setNetworkState(state);
    });

    return () => {
      logger.debug('Unmounting NetworkProvider');
      unsubscribe();
    };
  });

  const value = {
    isConnected: networkState?.isConnected ?? null,
    isInternetReachable: networkState?.isInternetReachable ?? null,
    type: networkState?.type ?? null,
  };

  return (
    <NetworkContext.Provider value={value}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
};
