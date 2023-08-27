import {
  Button,
  TextField,
  Typography,
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { AccountTreeOutlined, Add, ArrowForwardIosSharp } from '@mui/icons-material';

const newChild = { name: 'New child', data: 'Data' };
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={3} square {...props} />
))(() => ({
  border: '3px solid rgba(25, 118, 210, .3)',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(25, 118, 210, .3)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
    justifyContent: 'space-between',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: 'rgba(0,0,0,.05)',
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

function App({ prop }) {
  const [click, setClick] = useState(0);
  const [tree, setTree] = useState(prop);
  const [data, setData] = useState("");

  useEffect(() => {
    if (click) {
      setData(JSON.stringify(tree).replace(/([,:{[])/g, '$1 ').replace(/([}\]])/g, ' $1'));
    }
  }, [click, tree]);

  return <>
    <Ele tree={tree} setTree={setTree} />
    <Button
      startIcon={<AccountTreeOutlined />}
      variant='contained'
      onClick={() => setClick(p => p + 1)}
      size='large'
    >
      Export
    </Button>
    <pre style={{ textWrap: 'wrap', fontSize: '1.2rem' }}>{data}</pre>
  </>
}
function Ele({ tree, setTree, k }) {
  const [open, setOpen] = useState(true);
  const [editable, setEditable] = useState(false);

  const handle = (x, i) => {
    const c = tree.children;
    c[i] = x;
    setTree({ ...tree, children: c }, k);
  }

  return (
    <div style={{ marginBottom: '9px' }}>
      <Accordion expanded={open}>
        <AccordionSummary
          expandIcon={
            <ArrowForwardIosSharp onClick={() => setOpen((p) => !p)}
              sx={{ fontSize: '1.5rem' }}
            />
          }>
          {editable ?
            <TextField
              label='Name '
              style={{ backgroundColor: 'white' }}
              value={tree.name}
              onChange={({ target: { value } }) => {
                setTree({ ...tree, name: value }, k);
              }}
              onKeyDown={({ key }) => {
                if (key === 'Enter' && tree.name) {
                  setEditable(false)
                }
              }}
            />
            : <Typography
              variant='h5'
              onClick={() => setEditable(true)}>
              {tree.name}
            </Typography>
          }
          <Button
            startIcon={<Add />}
            variant='contained'
            onClick={() =>
              setTree({
                ...tree,
                data: undefined,
                children: tree.children ? [...tree.children, newChild] : [newChild],
              }, k)}
          >
            Add Child
          </Button>
        </AccordionSummary>
        <AccordionDetails>
          {tree.data !== undefined ? (
            <TextField
              style={{ backgroundColor: 'white' }}
              label='Data '
              value={tree.data}
              onChange={({ target: { value } }) => {
                setTree({ ...tree, data: value }, k);
              }}
            />
          ) : (
            tree.children.map((e, i) => <Ele key={i} tree={e} setTree={handle} k={i} />)
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default App;
