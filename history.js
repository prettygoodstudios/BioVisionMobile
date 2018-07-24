import { createMemoryHistory } from 'history';
const history = createMemoryHistory({});

export function goBack(){
  return history.push(history.entries[history.entries.length-2].pathname);
}

export default history;
