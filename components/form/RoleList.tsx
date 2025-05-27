import React from "react";
import { TouchableOpacity } from "react-native";
import { List } from "react-native-paper";
import { RoleFace } from "types/interfaces/store/UserFace";
const AllRole = require('../../assets/roles/allroles.png')
interface PropsFace {
  ActiveRole: string;
  handleChangeRole: (role: RoleFace) => any
}
export default function RoleList({
  ActiveRole,
  handleChangeRole
}: PropsFace) {
  return <List.Accordion style={{
    marginHorizontal: 20,
    borderRadius: 20,
    paddingHorizontal: 15
  }} title={`Roles (${ActiveRole == "" ? "select one" : ActiveRole})`} id={'1'} left={props => <List.Icon color='black' icon={AllRole} />}>
    <TouchableOpacity onPress={() => handleChangeRole("Roam")}>
      <List.Item style={ActiveRole == "Roam" && {
        backgroundColor: 'lightgray'
      }} title="Roam" />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleChangeRole("exp")}>
      <List.Item style={ActiveRole == "exp" && {
        backgroundColor: 'lightgray'
      }} title="Exp" />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleChangeRole("MM")}>
      <List.Item style={ActiveRole == "MM" && {
        backgroundColor: 'lightgray'
      }} title="MM" />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => handleChangeRole("mid")}>
      <List.Item style={ActiveRole == "mid" && {
        backgroundColor: 'lightgray'
      }} title="mid" />
    </TouchableOpacity>

    <TouchableOpacity onPress={() => handleChangeRole("jg")}>
      <List.Item style={ActiveRole == "jg" && {
        backgroundColor: 'lightgray'
      }} title="Jg" />
    </TouchableOpacity>
  </List.Accordion>;
}
