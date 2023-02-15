import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Button, Typography } from "@mui/material";
import { AgentType } from "../types";

type ListType = {
  agents: AgentType[];
  action: {
    type: string;
    func: (agent: AgentType) => void;
  };
};
const ListComponent = ({ agents, action }: ListType) => {
  return (
    <List
      dense
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        margin: "auto",
      }}>
      {agents.map((agent, index) => (
        <ListItem
          sx={{ padding: 1 }}
          key={index}
          secondaryAction={
            <Button
              size="small"
              variant="outlined"
              onClick={() => action.func(agent)}>
              {action.type}
            </Button>
          }
          disablePadding>
          <ListItemButton>
            <Typography variant="body2" sx={{ mr: 2 }}>
              {agent.name}
            </Typography>
            <Typography variant="body2">{agent.email}</Typography>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ListComponent;
