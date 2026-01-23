import { useInjection } from '@/shared/hooks/use-injection';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AddAccountViewModel } from '../viewmodels/AddAccountViewModel';


const AddAccountScreen = observer(() => {
  const navigation = useNavigation();
  const vm = useInjection(AddAccountViewModel);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
        <Text style={styles.title}>Add new account</Text>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={vm.name}
          onChangeText={vm.setName}
          placeholder=""
          placeholderTextColor="#888"
        />
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleButton, !vm.isCredit && styles.toggleActive]}
            onPress={() => vm.setIsCredit(false)}
          >
            <Text style={[styles.toggleText, !vm.isCredit && styles.toggleTextActive]}>BALANCE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, vm.isCredit && styles.toggleActive]}
            onPress={() => vm.setIsCredit(true)}
          >
            <Text style={[styles.toggleText, vm.isCredit && styles.toggleTextActive]}>CREDIT</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Amount</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={vm.amount}
            onChangeText={vm.setAmount}
            keyboardType="numeric"
            placeholder="Amount"
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.currencyButton} onPress={vm.openCurrencyPicker}>
            <Text style={styles.currencyText}>{vm.currency}</Text>
          </TouchableOpacity>
        </View>
        {vm.isCredit && (
          <>
            <Text style={styles.label}>Credit limit</Text>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={vm.creditLimit}
                onChangeText={vm.setCreditLimit}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#888"
              />
              <TouchableOpacity style={styles.currencyButton} onPress={vm.openCurrencyPicker}>
                <Text style={styles.currencyText}>{vm.currency}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.label}>Payment date</Text>
            <TouchableOpacity style={styles.input} onPress={vm.openPaymentDatePicker}>
              <Text style={styles.inputText}>{vm.paymentDate || 'None'}</Text>
            </TouchableOpacity>
            <Text style={styles.label}>Remind</Text>
            <TouchableOpacity style={styles.input} onPress={vm.openRemindPicker}>
              <Text style={styles.inputText}>{vm.remindText}</Text>
            </TouchableOpacity>
          </>
        )}
        <Text style={styles.label}>Choose an icon</Text>
        <TouchableOpacity style={styles.input} onPress={vm.openIconPicker}>
          <Text style={styles.inputText}>{vm.iconText}</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Account type</Text>
        <TouchableOpacity style={styles.input} onPress={vm.openAccountTypePicker}>
          <Text style={styles.inputText}>{vm.accountTypeText}</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Category</Text>
        <TouchableOpacity style={styles.input} onPress={vm.openCategoryPicker}>
          <Text style={styles.inputText}>{vm.categoryText}</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Color</Text>
        <TouchableOpacity style={styles.colorBar} onPress={vm.openColorPicker}>
          <View style={[styles.colorPreview, { backgroundColor: vm.color }]} />
        </TouchableOpacity>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, { height: 60 }]}
          value={vm.notes}
          onChangeText={vm.setNotes}
          placeholder=""
          placeholderTextColor="#888"
          multiline
        />
        <TouchableOpacity style={styles.addButton} onPress={vm.addAccount} disabled={vm.loading}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
  },
  label: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 16,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#23243A',
    borderRadius: 8,
    color: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 8,
  },
  inputText: {
    color: '#fff',
    fontSize: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    marginBottom: 8,
    marginTop: 8,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#23243A',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: '#1ED760',
  },
  toggleText: {
    color: '#aaa',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toggleTextActive: {
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  currencyButton: {
    backgroundColor: '#23243A',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginLeft: 8,
  },
  currencyText: {
    color: '#fff',
    fontSize: 16,
  },
  colorBar: {
    height: 16,
    borderRadius: 8,
    backgroundColor: '#23243A',
    marginBottom: 8,
    marginTop: 4,
    justifyContent: 'center',
  },
  colorPreview: {
    height: 12,
    borderRadius: 6,
    marginHorizontal: 4,
    marginVertical: 2,
  },
  addButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  cancelButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.7,
  },
});

export default AddAccountScreen;
