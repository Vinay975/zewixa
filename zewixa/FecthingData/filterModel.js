import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Switch, TextInput } from 'react-native';

export default function FilterModal({ visible, onClose, onApply }) {
  const [acOnly, setAcOnly] = useState(false);
  const [gender, setGender] = useState('All');
  const [minRent, setMinRent] = useState('');
  const [maxRent, setMaxRent] = useState('');

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Filters</Text>
          <View style={styles.row}>
            <Text>AC Only</Text>
            <Switch value={acOnly} onValueChange={setAcOnly} />
          </View>
          <View style={styles.row}>
            <Text>Gender</Text>
            {['All','Boys','Girls','Co-ed'].map((g) => (
              <TouchableOpacity
                key={g}
                style={[styles.btn, gender === g && styles.btnActive]}
                onPress={() => setGender(g)}
              >
                <Text>{g}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.row}>
            <Text>Rent</Text>
            <TextInput
              style={styles.input} placeholder="Min"
              keyboardType="numeric"
              value={minRent} onChangeText={setMinRent}
            />
            <TextInput
              style={styles.input} placeholder="Max"
              keyboardType="numeric"
              value={maxRent} onChangeText={setMaxRent}
            />
          </View>
          <TouchableOpacity
            style={styles.apply}
            onPress={() => onApply({ acOnly, gender, minRent, maxRent })}
          >
            <Text style={{ color: 'white' }}>Apply</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={{ marginTop: 8 }}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex:1, backgroundColor:'rgba(0,0,0,0.5)', justifyContent:'center', alignItems:'center' },
  content: { width:'80%', backgroundColor:'#fff', padding:16, borderRadius:8 },
  title: { fontSize:18, fontWeight:'bold', marginBottom:12 },
  row: { flexDirection:'row', alignItems:'center', marginVertical:8, flexWrap:'wrap' },
  btn: { padding:6, borderWidth:1, borderColor:'#ccc', borderRadius:4, marginHorizontal:4 },
  btnActive: { backgroundColor:'#6846bd', borderColor:'#6846bd' },
  input: { borderWidth:1, borderColor:'#ccc', borderRadius:4, padding:4, width:60, marginHorizontal:4 },
  apply: { backgroundColor:'#6846bd', padding:10, borderRadius:6, alignItems:'center', marginTop:12 }
});
