import { useState } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [nasa, setNasa] = useState(null);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const nasaAPI = () => {
    console.log(
      date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate(),
    );
    fetch(
      'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=' + date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate(),)
      .then(response => response.json())
      .then(json => setNasa(json.url))
      .catch(error => console.log('Erro ' + error));
  };

  return (
    <View style={styles.container}>
      {!nasa ? (
        <>
          <Text>{date.toLocaleDateString('fr')}</Text>
          <View/>
          {/* <Button title='Alterar Data' onPress={() => setOpen(true)} /> */}
          <Button onPress={() => setShow(true)} title="Escolha uma data" />
          <Text>selected: {date.toLocaleString()}</Text>
          <View />
          <Button title='Buscar' onPress={() => nasaAPI()} />
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </>
      ) : (
        <View>
          <Button title='Procurar outra foto' onPress={() => setNasa(null)}/>
          <Image
            source={{ uri: nasa }}
            style={styles.imagem}
            resizeMode='contain'
          />
          <Text>{nasa}</Text>
        </View>
      )}

    </View>
  );
};

export default App;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagem: {
    padding: 150,
    height: 100,
    width: 100,

  },
});
