import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  MemoryRouter,
} from "react-router-dom";

function Menu() {
  return (
    <>
      <hr />
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="outlined" component={RouterLink} to="/social">
          Réseau social
        </Button>
        <Button variant="outlined" component={RouterLink} to="/marketplace">
          Marketplace
        </Button>
        <Button variant="outlined" component={RouterLink} to="/car">
          Mes véhicules
        </Button>
      </Stack>
    </>
  );
}

export default Menu;
