import React, { useContext, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect } from "react";
import { loadLanguage, loadLoading } from "../redux/actions";
import { useAppDispatch } from "./dispatch";

var kh = require('../res/lang/kh.json');
var en = require('../res/lang/en.json');

const AppContext = createContext<any>(null);

export function AppProvider({ children }: any) {
  const _provider = useAppProvider();
  return <AppContext.Provider value={_provider}>{children}</AppContext.Provider>
}

export const useAuth = () => {
  return useContext(AppContext);
};

function useAppProvider() {

  const dispatch = useAppDispatch();
  const [user, setUser] = useState<boolean>();

  useEffect(() => {
    checkLanguage();
    checkUser();
  }, []);

  async function checkLanguage() {
    let lang = await AsyncStorage.getItem('@lang');
    if (lang == 'kh') {
      dispatch(loadLanguage(kh));
    } else {
      dispatch(loadLanguage(en));
    }
  }

  async function checkUser() {
    let token = await AsyncStorage.getItem('@token')
    if (token) {
      try {
        setUser(true);
      } catch (error) {
        setUser(true);
        await AsyncStorage.removeItem('@token');
      }
    } else {
      setUser(false);
    }
  }
  
  return { user };
}