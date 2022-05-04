import { useDispatch, useSelector } from "react-redux";
import { filterContact } from "../../redux/store";
import { Label, Input } from "./Filter.styled";

const Filter = () => {
  const value = useSelector((state) => state.contacts.filter);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(filterContact(event.target.value));
  };
  return (
    <Label>
      Filter
      <Input type="text" value={value} onChange={handleChange}></Input>
    </Label>
  );
};

export default Filter;
