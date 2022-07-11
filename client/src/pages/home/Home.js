import React from 'react'
import { Fragment } from 'react';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightsidebar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import './style.css';

export default function Home() {
  return (
    <Fragment>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed  />
        <Rightbar />
      </div>
    </Fragment>
  )
}
