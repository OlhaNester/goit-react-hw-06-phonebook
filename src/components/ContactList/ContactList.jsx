import { FilteredList, CardContact, ButtonDelete } from "./ContactList.styled";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../../redux/store";
import { ReactComponent as TrashIcon } from "../ContactList/trash.svg";

const ContactList = () => {
  const contacts = useSelector((state) => state.contacts.items);
  const filterValue = useSelector((state) => state.contacts.filter);
  const dispatch = useDispatch();
  const getFilteredContacts = () => {
    const normalizedFilter = filterValue.toLocaleLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };
  const filteredContacts = getFilteredContacts();
  return (
    <FilteredList>
      {filteredContacts.map(({ id, name, number }) => (
        <CardContact key={id}>
          <p>{name}</p>
          <p>{number}</p>
          <ButtonDelete onClick={() => dispatch(deleteContact(id))}>
            <TrashIcon width="20" height="20" />
          </ButtonDelete>
        </CardContact>
      ))}
    </FilteredList>
  );
};

export default ContactList;
