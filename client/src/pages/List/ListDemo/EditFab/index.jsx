import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { Edit, Delete, Add, Share } from '@mui/icons-material';

const handleAdd = (e) => {
    // set state, redux
}

const handleDelete = (e) => {
    // set state, redux
}

const actions = [
  { icon: <Add onClick={handleAdd} />, name: 'Add' },
  { icon: <Delete onClick={handleDelete} />, name: 'Delete' },
  { icon: <Share />, name: 'Share' },
];

export default function BasicSpeedDial() {
  return (
    <React.Fragment>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 25, right: 25 }}
        icon={<Edit />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </React.Fragment>
  );
}