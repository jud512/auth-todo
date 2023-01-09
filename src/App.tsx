import { Amplify } from 'aws-amplify';
import { I18n } from 'aws-amplify';
import { Authenticator, translations } from '@aws-amplify/ui-react';
import './App.css'
import Todo from './components/Todo';

import {
  withAuthenticator,
  WithAuthenticatorProps,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';



import awsExports from './aws-exports';
import { useState } from 'react';
import LearnWithWords from './components/LearnWithWords';
Amplify.configure(awsExports);

interface Props extends WithAuthenticatorProps {
  isPassedToWithAuthenticator: boolean;
}

//dictionary: https://github.com/aws-amplify/amplify-ui/blob/main/packages/ui/src/i18n/dictionaries/authenticator/en.ts

I18n.putVocabularies(translations);
I18n.setLanguage('hu');

I18n.putVocabulariesForLanguage('hu', {
  'Sign In': 'Bejelentkezés', // Tab header
  'Sign in': 'Bejelentkezés', // Button label
  'Sign in to your account': 'Üdvözöllek ismét!',
  'Signing in':'Bejelentkezés folyamatban',
  Username: 'Felhasználónév', // Username label
  Password: 'Jelszó', // Password label
  'Forgot your password?': 'Elfelejtett jelszó',
   'Create Account': 'Regisztráció', // Tab header
  'Create a new account': 'Új felhasználó', // Header text
  'Confirm Password': 'Jelszó még egyszer', // Confirm Password label
  Email: 'E-mail cím',
  'Phone Number': 'Telefonszám',
  'Reset Password': 'Elfelejtett jelszó',
  'Reset your password': 'Elfelejtette jelszavát?',
  'Enter your username': 'Felhasználónév megadása',
  'Send code': 'Jelszó visszaállítása',
  'Back to Sign In': 'Vissza a bejelentkezéshez',
  'Code': 'Kód',
  'New Password': 'Új jelszó',
  Confirming:'Ellenőrzés',
  'Submit': 'Elküld',
  'Enter your Username' : 'Felhasználónév megadása',
  'Enter your Password' : 'Jelszó megadása',
  'Please confirm your Password': 'Jelszó megadása még egyszer',
  'Enter your Email': 'E-mail cím megadása',
  'Incorrect username or password.': 'Helytelen felhasználónév vagy jelszó.',
  'User does not exist.':'A felhasználó nem létezik.',
  'Confirmation Code' : 'Regisztrációs kód',
  'Enter your code' : 'Add meg a kódodat!',
  'Confirm' : 'Jóváhagy',
  'Resend Code' : 'Új kód küldése',
  'We Emailed You' : 'Küldtünk neked e-mailt',
  'Code *' : 'Kód',
  'We Texted You' : 'Egy üzenetet küldtünk neked',
  'Your code is on the way. To log in, enter the code we sent you. It may take a minute to arrive.': 'Ellenőrizd a postafiókodat. A bejelentkezéshez küldtünk egy kódot. Eltarthat néhány percig, amíg megérkezik.',  
  'Password must have at least 8 characters': 'A jelszónak minimum 8 karakter hosszúnak kell lennie.',
  'Your passwords must match': 'A két jelszónak meg kell egyeznie.',
  'Your code is on the way. To log in, enter the code we emailed to':'A kódod úton van. A bejelentkezéshez add meg a kódot, amit a következő e-mailben megkaptál: ',
  'Your code is on the way. To log in, enter the code we sent you':'A kódod úton van. Bejelentkezéshez add meg a kódot, amit küldtünk',
  'Your code is on the way. To log in, enter the code we texted to':'A kódod úton van. Bejelentkezéshez add meg a kódot, amit küldtünk az üzenetben',
  'It may take a minute to arrive':'Eltarthat néhány percig, amíg megérkezik',
  'Invalid verification code provided, please try again.':'Érvénytelen azonosítás, kérlek próbáld meg újra.'
  

});

Amplify.configure(awsExports);



function App({ isPassedToWithAuthenticator, signOut, user }: Props) {
  if (!isPassedToWithAuthenticator) {
    throw new Error(`isPassedToWithAuthenticator was not provided`);
  }

  const [openTodo, setOpenTodo] = useState(false);
  const [openLearnWithWords, setOpenLearnWithWords] = useState(false);

  const handleOpenTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenTodo(!openTodo)
  }
  const handleOpenLearnWithWords = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenLearnWithWords(!openLearnWithWords)
  }

  return (
    <Authenticator >
       <div className='App'>
        <div className="header">
          <p>{user?.username}</p>
          <button onClick={signOut} >Sign out</button>
        </div>
        <h1>Válassz az alábbi alkalmazások közül</h1>
        <div className="apps">
          <button className='btn' onClick={handleOpenTodo}>TODO</button>
          <button className='btn' onClick={handleOpenLearnWithWords}>Szótanulás - szavakkal</button>
          <button className='btn'>Szótanulás - leírással</button>
        </div>
        
        
        {openTodo && <Todo />}
        {openLearnWithWords && <LearnWithWords />}
        
      </div>
    </Authenticator>
   
  );
}

export default withAuthenticator(App);

export async function getStaticProps() {
  return {
    props: {
      isPassedToWithAuthenticator: true,
    },
  };
}
