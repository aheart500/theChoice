const __dev__ = true;

const firebaseConfig = __dev__
  ? {
      apiKey: "AIzaSyA1CjfPRYgg0Hw5OnwvSUbAFg9cbdSwfns",
      authDomain: "thechoice-f11cf.firebaseapp.com",
      projectId: "thechoice-f11cf",
      storageBucket: "thechoice-f11cf.appspot.com",
      messagingSenderId: "988676479791",
      appId: "1:988676479791:web:9b5f8976e3f41d76311fda",
      measurementId: "G-M6K691PYRK",
    }
  : {
      apiKey: "AIzaSyBCtcSp2IU-QWlim1CI7KrezdAzg-yFOuo",
      authDomain: "thechoicedryehia.firebaseapp.com",
      projectId: "thechoicedryehia",
      storageBucket: "thechoicedryehia.appspot.com",
      messagingSenderId: "115079301661",
      appId: "1:115079301661:web:6a4cb8027950cddcf394f4",
      measurementId: "G-TNMGBMKEWS",
    };

export { firebaseConfig };
