
import { Tree } from '../types/Tree';

interface Props {
  trees: Tree[];
}

const TreeList: React.FC<Props> = ({ trees }) => (
  <ul>
    {trees.map(tree => (
      <li key={tree.id}>
        {tree.species} – {tree.date}
      </li>
    ))}
  </ul>
);

export default TreeList;
