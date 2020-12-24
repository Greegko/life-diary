import { auth } from 'firebase-functions';
import { initializeUserData } from './initializeUserData';
import { initializeApp } from 'firebase-admin';

initializeApp();

exports.initializeUserData = auth.user().onCreate(initializeUserData);
