import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { List } from "react-native-paper";
import { RoleFace } from "types/interfaces/store/UserFace";
const AllRole = require('../../assets/roles/allroles.png')

interface PropsFace {
  ActiveRole: string;
  handleChangeRole: (role: RoleFace) => any;
}

export default function RoleList({
  ActiveRole,
  handleChangeRole
}: PropsFace) {
  const [expanded, setExpanded] = useState(false);

  const handlePress = (role: RoleFace) => {
    handleChangeRole(role);
    setExpanded(false);
  };

  return (
    <List.Accordion
      expanded={expanded}
      onPress={() => setExpanded(!expanded)}
      style={{
        marginHorizontal: 20,
        borderRadius: 20,
        paddingHorizontal: 15
      }}
      title={`Roles (${ActiveRole == "" ? "select one" : ActiveRole})`}
      id={'1'}
      left={props => <List.Icon color='black' icon={AllRole} />}
    >
      {["Roam", "Exp", "MM", "Mid", "Jungle"].map((role) => (
        <TouchableOpacity key={role} onPress={() => handlePress(role as RoleFace)}>
          <List.Item
            style={ActiveRole === role ? { backgroundColor: 'lightgray', borderRadius: 50 } : {}}
            title={role}
          />
        </TouchableOpacity>
      ))}
    </List.Accordion>
  );
}
