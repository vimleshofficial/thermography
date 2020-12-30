import React from 'react'
import { Sider } from '../StyledComponents'

const Sidebar = ({ position, children }) => {
  return <Sider side={position}>{children}</Sider>
}
export default Sidebar
