"use client"
import React from 'react';
import { store } from './index'
import { Provider } from 'react-redux'

export function NextshopApiProvider({children} : {children: React.ReactNode}) {
  return <Provider store={store}>{children}</Provider>;
}