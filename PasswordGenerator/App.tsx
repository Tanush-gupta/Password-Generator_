import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Formik} from 'formik';
// Password Validation
import * as Yup from 'yup';
const PasswordScehema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be at least 4 character long')
    .max(16, 'Should be less than 16 character long')
    .required('Length is required Field'),
});
export default function App() {
  const [password, setPassword] = useState('');
  const [isPasswGenerated, setisPasswGenerated] = useState(false);
  const [lowerCase, setlowerCase] = useState(false);
  const [upperCase, setupperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const GeneratePassword = (passwordLength: number) => {
    console.log('called')
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '1234567890';
    const specialChars = '!@#$%^&*()_+';
    let CharacterList = '';
    if (lowerCase) CharacterList += lowerChars;
    if (upperCase) CharacterList += upperChars;
    if (numbers) CharacterList += digitChars;
    if (symbols) CharacterList += specialChars;
    const result = createPassword(CharacterList, passwordLength);
    setPassword(result);
    setisPasswGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const element = Math.round(Math.random() * characters.length);
      result += characters.charAt(element);
    }
    console.log(result);
    return result;
  };

  const resetPassword = () => {
    setPassword('');
    setlowerCase(false);
    setupperCase(false);
    setNumbers(false);
    setSymbols(false);
    setisPasswGenerated(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={PasswordScehema}
            onSubmit={values => {

              return GeneratePassword(+values.passwordLength);
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
  
            }) => (
              <View style={{
                borderWidth:1,
                margin:20,
                borderRadius:10,
              }}>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Password Length</Text>
                  
                  <View style={styles.inputColumn}>
                    <TextInput
                      style={styles.inputStyle}
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder="Enter the Password Length"
                      keyboardType="numeric"></TextInput>
                  </View>
                </View>
                {touched.passwordLength && errors && (
                    <Text style={styles.errorText}>
                      {errors.passwordLength}
                    </Text>
                  )}
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include LowerCase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={lowerCase}
                    onPress={() => setlowerCase(!lowerCase)}
                    fillColor="#65e07a"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include UpperCase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={() => setupperCase(!upperCase)}
                    fillColor="#ff7aa9"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="#4287f5"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Special Characters</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="#dce880"
                  />
                </View>
                <View style={styles.formActions}>

                  <TouchableOpacity
                    disabled={!isValid}
                    onPress={handleSubmit}
                    style={styles.primaryBtn}>
                    <Text style={styles.primaryBtnText}>Generate Password</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPassword();
                    }}>
                    <Text style={styles.secondaryBtnText}>Reset Password</Text>
                  </TouchableOpacity>

                </View>
              </View>
            )}
          </Formik>
        </View>
        {isPasswGenerated ? (
          <View style={styles.resultContainer}>
            <Text style={styles.heading}> Result:</Text>
            <Text selectable={true} style={styles.result}>{password}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor:'#2c362d',
    height:1000,
    flex:1,
  },
  formContainer: {
    paddingHorizontal:5,
    paddingVertical:20
  },
  title: {
    fontSize:30,
    color:'white',
    padding:8,
    fontFamily: 'Ubuntu',
    textAlign:'center'
  },
  inputWrapper: {
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  margin:15,
    
  },
  formActions: {
    marginVertical:0,
   flexDirection:'row',
   justifyContent:'space-around',
    marginTop:15,
    marginBottom:15
  },
  inputColumn: {
    backgroundColor:'#677068',
    borderRadius:10,
    width:150,
    
  },
  inputStyle: {
    color:'white',
    textAlign:'center',
    padding:5,
    fontSize:12,
  },
  heading: {
    height:20,
    fontSize:15,
    fontWeight:'bold',
    color:'white'
  },
  errorText: {
    color:'red',
    textAlign:'center'

  },
  primaryBtn: {
    height:40,
    elevation:4,
    borderBlockColor:'white',
    padding:4,
    backgroundColor:'#ffab5c',
    borderRadius: 8,
    justifyContent:'center'
  },
  primaryBtnText: {
    color:'black',
  },
  secondaryBtn: {
    height:40,
    padding:4,
    elevation:4,
    backgroundColor:'#ffec6e',
    borderRadius: 8,
    justifyContent:'center'
  },
  secondaryBtnText: {
    color:'black',
  },
  resultContainer:{
    flexDirection:'row',
    margin:50,
    borderWidth:1,
    justifyContent:'space-around',
    padding:14,
    backgroundColor:'#fce468ss',
    borderBlockColor:'white',
    borderRadius:10,
  }
  ,result: {
    backgroundColor:'#6b736c',
    padding:5,
    borderRadius:5,
    color:'white',
  }
});
