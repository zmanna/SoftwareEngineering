const ffi = require('ffi-napi');
const ref = require('ref-napi'); // For handling reference types like bool&
const double = ref.types.double;
const char = ref.types.char;
const bool = ref.types.bool;
const boolPtr = ref.refType(bool);
const app = express();
app.use(express.json());

let myCppLibrary = ffi.Library('/Users/willlawerence/Desktop/EECS348/Geeb/calculator.cpp', {
  'applyOperator': ['double', [char, double, double, boolPtr]]
});

app.post('/calculate', (req, res) => {
    const { op, operand1, operand2 } = req.body;
  
    if (op === undefined || operand1 === undefined || operand2 === undefined) {
      return res.status(400).send('Missing calculation parameters');
    }
  
    let error = ref.alloc(bool);
    let result;
    try {
      result = myCppLibrary.applyOperator(op, operand1, operand2, error);
    } catch (e) {
      return res.status(500).send('Error in C++ computation');
    }
  
    let isError = ref.deref(error);
    if (isError) {
      return res.status(500).send('Calculation error');
    }
  
    res.json({ result: result });
  });
  
  


  
// Example: Calling a function
let result;
try {
  result = myCppLibrary.applyOperator(op, operand1, operand2, error);
} catch (e) {
  return res.status(500).send('Error in C++ computation');
}

let isError = ref.deref(error);
if (isError) {
  return res.status(500).send('Calculation error');
}

