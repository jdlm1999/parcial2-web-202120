import React from 'react';
import { LOCALES } from '../i18n/locales';

export const I18nSelect = ({ setLanguage }) => {

  return <div>
    <select name="cars" id="cars" onChange={e => setLanguage(e.target.value)}>
      <option value={LOCALES.SPANISH} default>Spanish</option>
      <option value={LOCALES.ENGLISH} >English</option>
    </select>
  </div>
};
