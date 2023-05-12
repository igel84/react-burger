import React from 'react'
import appHeader from './app-header.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export default function AppHeader() {
  return (
    <header>
      <nav className={appHeader.nav}>
        <ul className={appHeader.menuLeft}>
          <li className="mt-4 mb-4 mr-2 p-5">
            <a href="/" className="p-2">
              <BurgerIcon type="primary" />
              <span className="text text_type_main-default pl-2">Конструктор</span>
            </a>
          </li>
          <li className="mt-4 mb-4 p-5">
            <a href="/" className="p-2">
              <ListIcon type="primary" />
              <span className="text text_type_main-default pl-2">Лента заказов</span>
            </a>
          </li>
        </ul>
        <a href="/" className={appHeader.logo}>
          <Logo />
        </a>
        <ul className={appHeader.menuRight}>
          <li className="mt-4 mb-4 p-5">
            <a href="/" className="p-2">
              <ProfileIcon type="primary" />
              <span className="text text_type_main-default pl-2">Личный кабинет</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}