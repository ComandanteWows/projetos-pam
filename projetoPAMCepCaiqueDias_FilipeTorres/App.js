import React, { useState, useRef } from 'react';
import { Text, View, ScrollView, TextInput, Pressable } from 'react-native';
import styles from './style';

export default function App() {
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [uf, setUf] = useState('');
  const [buttonHover, setButtonHover] = useState(false);

  const cepRef = useRef(null);

  const buscarCep = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      setLogradouro(data.logradouro);
      setBairro(data.bairro);
      setLocalidade(data.localidade);
      setUf(data.uf);
    } catch (error) {
      alert('CEP inválido');
      setLogradouro('');
      setBairro('');
      setLocalidade('');
      setUf('');
      console.error(error);
    }
  };

  const enviarFormulario = () => {
    if (!cep) {
      alert('Formulário incompleto');
      return;
    }
    alert('Formulário enviado!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Consulta de Endereço por CEP</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>CEP:</Text>
          <TextInput
            ref={cepRef}
            style={styles.input}
            placeholder="Digite o CEP"
            placeholderTextColor="#888"
            onChangeText={setCep}
            value={cep}
            onBlur={buscarCep}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Logradouro:</Text>
          <TextInput style={styles.input} value={logradouro} editable={false} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Bairro:</Text>
          <TextInput style={styles.input} value={bairro} editable={false} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Localidade:</Text>
          <TextInput style={styles.input} value={localidade} editable={false} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>UF:</Text>
          <TextInput style={styles.input} value={uf} editable={false} />
        </View>
        <Pressable
          style={[
            styles.button,
            buttonHover && { backgroundColor: '#3561b7' }
          ]}
          onPress={enviarFormulario}
          onHoverIn={() => setButtonHover(true)}
          onHoverOut={() => setButtonHover(false)}
        >
          <Text style={styles.buttonText}>Enviar Formulário</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}