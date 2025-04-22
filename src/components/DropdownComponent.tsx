import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DropDownI } from '../Interface/interface';

function MyDropdown({optionOne, optionTwo, optionThree} : DropDownI  ) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Selecione uma opção
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={optionOne}>Melhores Cafés</Dropdown.Item>
        <Dropdown.Item onClick={optionTwo}>Lista</Dropdown.Item>
        <Dropdown.Item onClick={optionThree}>Mais perto de você</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MyDropdown;