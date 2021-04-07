import React from 'react';
import {appName} from '../config'

function Footer() {
  return (
    <p className="border-top pt-3 text-center">
        {appName} &copy; { new Date().getFullYear() }
    </p>
  )
}

export default Footer;
