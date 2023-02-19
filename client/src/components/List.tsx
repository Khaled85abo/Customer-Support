import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Button, Typography, Box } from "@mui/material";
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
        maxWidth: 500,
        bgcolor: "background.paper",
        margin: "auto",
        padding: 1,
      }}>
      {agents.map((agent, index) => (
        <ListItem
          sx={{ padding: 1, borderBottom: "1px solid gray", marginTop: 2 }}
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
          <Box sx={{ marginRight: "5rem" }}>
            <Typography variant="body1">{agent.name}</Typography>
            <Typography variant="overline">{agent.email}</Typography>
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default ListComponent;
