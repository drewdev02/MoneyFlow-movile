import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '@/core/db/migrations/migrations';
import React, { PropsWithChildren } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useLogger } from '../hooks/use-logger';
import { useInjection } from '../hooks/use-injection';
import { Database } from '@/core/db';

export const DatabaseProvider = ({ children }: PropsWithChildren) => {
  const db = useInjection(Database)
  const { success, error } = useMigrations(db, migrations);
  const logger = useLogger("DatabaseProvider");

  if (error) {
    logger.error("Migration error", error);
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Migration error: {error.message}</Text>
      </View>
    );  
  }
  return children;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  }
});
