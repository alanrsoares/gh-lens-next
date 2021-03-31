import { GoMarkGithub } from "react-icons/go";
import qs from "query-string";

interface Props {
  href: string;
}

const SignInWithGithubLink: React.FC<Props> = ({ href }) => (
  <a
    className="p-4 bg-gray-800 rounded-md text-white flex items-center"
    href={href}
  >
    <GoMarkGithub className="mr-2" /> Sign in with Github
  </a>
);

export default SignInWithGithubLink;
