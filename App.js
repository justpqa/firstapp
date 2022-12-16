import React, {useState, useEffect} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
//import Midnight from 'react-native-midnight'

const dayjs = require('dayjs')
//import dayjs from 'dayjs' // ES 2015
dayjs().format()
const moment = require('moment'); // require
moment().format(); 

// variable for keys
let dateKey = "@user_date";
let monthKey = "@user_month";
let yearKey = "@user_year";

const App = () => {
  /** 
  const [alpha1, setAlpha1] = useState(0);
  const [alpha2, setAlpha2] = useState(1);
  const [alpha3, setAlpha3] = useState(0);
  const [alpha4, setAlpha4] = useState(0);
  const [alpha5, setAlpha5] = useState(0);
  */
  const [alpha1, setAlpha1] = useState(0);
  const [alpha2, setAlpha2] = useState(0);
  const [alpha3, setAlpha3] = useState(0);
  const [text, setText] = useState("");
  const [disabled1, setdis1] = useState(false);
  const [disabled2, setdis2] = useState(false);
  const [edit1, setedit1] = useState(true);
  // set temporary date for checking
  const [temp1, settemp1] = useState("");
  const [temp2, settemp2] = useState("");
  const [temp3, settemp3] = useState("");
  var date = new Date();
  // set empty string for these var
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [showView1, setshowView1] = useState(false);
  const [showView2, setshowView2] = useState(false);

  const getData = async (key1, key2, key3) => {
    try {
      const value1 = await AsyncStorage.getItem(key1);
      const value2 = await AsyncStorage.getItem(key2);
      const value3 = await AsyncStorage.getItem(key3);
      if(value1 !== null && value2 !== null && value3 !== null) {
        // value previously stored
        setDay(value1);
        setMonth(value2);
        setYear(value3);
      }
    } catch(e) {
      // error reading value
      alert('Failed to fetch the input from storage');
    }
  }
  
  useEffect(() => {
    getData(dateKey, monthKey, yearKey);
  }, []);

  // if input is a number in the right range, then add it to date (temp1, temp2, temp3 are placeholder)
  const checkInput = () => {
    if (/\d/.test(temp3)) {
      setYear(parseInt(temp3));
    } else {
      alert("Please enter a number for year");
      setedit1(true);
      return ;
    }
    if (/\d/.test(temp2)) {
      setMonth(parseInt(temp2));
    } else {
      alert("Please enter a number for month");
      setedit1(true);
      return ;
    }
    if (/\d/.test(temp1)) {
      setDay(temp1);
    } else {
      alert("Please enter a number for date");
      setedit1(true);
      return ;
    }
    setedit1(false);
  }

  // calculalte number of date 
  const NumDate = () => {
    const start = dayjs(year + "-" + month + "-" + day)
    const currmonth = date.getMonth() + 1
    const end = dayjs(date.getFullYear() + "-" + currmonth + "-" + date.getDate())
    return end.diff(start, "day")
  }

  // Use AsyncStorage to keep the stage of data (https://react-native-async-storage.github.io/async-storage/docs/usage)
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      // saving error
      alert('Failed to save the data to the storage')
    }
  }

  // store the date, month, year data on associated key
  const onSubmit = () => {
    storeData(dateKey, String(day));
    storeData(monthKey, String(month));
    storeData(yearKey, String(year));
  }

  // clear storage after reseting the date
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      alert('Failed to clear the async storage.');
    }
  };

  // effect for change of day after midnight
  /** 
  useEffect(() => {
    const listener = Midnight.addListener(() => {
      setnumDate(NumDate());
    })
    return () => listener.remove()
  }, [])
  */

  const showDate = () => {
    if (NumDate() === "NaN") {
      return 0;
    }
    return NumDate();
  }

  return (
    <View style={styles.containers}>
      <View>
        <Text style={{fontSize: 15}}>What is you two first day together?</Text>
      </View>
      <View style={styles.row}>
        <TextInput placeholder="day" onChangeText={temp1 => settemp1(temp1)} defaultValue={temp1} editable={edit1} style={styles.input}/>
        <TextInput placeholder="month" onChangeText={temp2 => settemp2(temp2)} defaultValue={temp2} editable={edit1} style={styles.input}/>
        <TextInput placeholder="year" onChangeText={temp3 => settemp3(temp3)} defaultValue={temp3} editable={edit1} style={styles.input}/>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button4, {marginBottom: 20}]} onPress={() => {checkInput();onSubmit();}}>
          <Text>Let's start the clock!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button4, {marginBottom: 20}]} onPress={() => {setedit1(true);clearStorage();}}>
          <Text>Re-enter the date</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginBottom: 10, marginTop: 50}}>
        <Text>We have been together for</Text>
      </View>
      <View style={styles.datetogether}>
        <Text>{showDate()}</Text>
        <Text>Days</Text>
      </View>
      <View>
        <View style={{alignItems:"center"}}>
          <View>
            <Text style={{fontSize: 15}}>Nam chan Quanh Chua.-.</Text>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => {setAlpha1(1); setText("Nam chan Quanh roi._."); setdis1(true);}} disabled={disabled1} style={styles.button1}>
              <Text>Roi</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setshowView1(true); setdis1(true);}} disabled={disabled1} style={styles.button2}>
              <Text>Ai them chan b</Text>
            </TouchableOpacity>
          </View>
          <View style={{opacity:alpha1}}>
            <Text>{text}</Text>
          </View>
        </View>
        {showView1 && (<View style={{alignItems:"center"}}>
          <View>
            <Text style={{fontSize: 15}}>Nam sap bo Quanh chua -_-</Text>
          </View>
          <View style={[styles.row]}>
            <TouchableOpacity onPress={() => {setText("Nam sap bo Quanh roi._."); setdis2(true); setAlpha2(1)}} disabled={disabled2} style={styles.button1}>
              <Text>Sap</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setshowView2(true); setdis2(true);}} disabled={disabled2} style={styles.button2}>
              <Text>Ai them bo b</Text>
            </TouchableOpacity> 
          </View>
          <View style={{opacity:alpha2}}>
            <Text>{text}</Text>
          </View>
        </View>)}
        {showView2 && (<View style={{alignItems:"center"}}>
          <View>
            <Text style={{fontSize: 15}}>Nam het thuong Quanh chua.-.</Text>
          </View>
          <View style={[styles.row]}>
            <TouchableOpacity onPress={() => {setAlpha3(1); setText("Nam het thuong Quanh roi._.");}} style={styles.button1}>
              <Text>Roi o^^</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setAlpha3(1); setText("iu Nam:3");}} style={styles.button2}>
              <Text>Hong</Text>
            </TouchableOpacity> 
          </View>
          <View style={{opacity:alpha3, marginTop: 10}}>
            <Text>{text}</Text>
          </View>
        </View>)}
      </View>
      <TouchableOpacity onPress={() => {setAlpha1(0); setAlpha2(0);setAlpha3(0); setText(""); setdis1(false); setdis2(false); setshowView1(false), setshowView2(false);}} style={styles.button3}>
        <Text>Reset it!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffc0cb'
  },
  button1: {
    alignItems: 'center',
    backgroundColor: '#ff69b4',
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 5
  },
  button2: {
    alignItems: 'center',
    backgroundColor: '#ff8080',
    padding: 10,
    marginBottom: 10,
    marginTop: 10, 
    marginLeft:10,
    marginRight: 10,
    borderRadius: 5
  },
  button3: {
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 5
  },
  button4: {
    alignItems: 'center',
    backgroundColor: '#e0bbe4',
    padding: 10,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  input: {
    alignItems:"center",
    padding: 10,
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#e0bbe4",
    borderRadius: 5
  },
  datetogether: {
    marginBottom: 60, 
    alignItems: "center", 
    backgroundColor:"violet", 
    height: 80, 
    width: 80, 
    padding: 20,
    borderRadius: 10
  }
})

export default App;