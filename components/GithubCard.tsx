import { Fragment } from "react";

import {
  GoRepo,
  GoLocation,
  GoOrganization,
  GoBriefcase,
  GoGlobe,
} from "react-icons/go";

import { Viewer } from "model/types";

import CenteredWithIcon from "./CenteredWithIcon";

const toSlug = (x: string) => x.toLowerCase().split(" ").join("-");

const toRows = (x: string) =>
  x.split("\n").map((x) => (
    <Fragment key={toSlug(x)}>
      {x}
      <br />
    </Fragment>
  ));

interface Props {
  viewer: Viewer;
}

const GithubCard: React.FC<Props> = ({ viewer }) => (
  <div className="md:border md:border-black md:rounded-lg md:h-auto p-4 bg-gray-800 text-white h-screen max-w-sm mx-auto">
    <figure className="p-2">
      <img
        src={viewer.avatar_url}
        alt="Github avatar"
        className="md:h-36 md:w-36 h-32 w-32 rounded-full mx-auto"
      />
    </figure>
    <div className="py-2 text-center">
      <h2 className="text-4xl text-center">{viewer.name}</h2>
      <a
        className="text-gray-300 text-sm"
        href={`https://github.com/${viewer.login}`}
        target="__blank"
        rel="noreferrer noopener"
        title={`View ${viewer.name}'s profile on Github`}
      >
        {viewer.login}
      </a>
    </div>
    {viewer.bio && (
      <div className="text-sm bg-gray-50 rounded-md text-gray-700 p-2">
        <em>{toRows(viewer.bio)}</em>
      </div>
    )}
    <div className="p-2">
      {viewer.blog && (
        <CenteredWithIcon IconComponent={GoGlobe}>
          <a
            href={viewer.blog}
            target="__blank"
            rel="noreferrer noopener"
            title={`Go to '${viewer.name}' website`}
          >
            {viewer.blog}
          </a>
        </CenteredWithIcon>
      )}
      {viewer.company && (
        <CenteredWithIcon IconComponent={GoBriefcase}>
          {viewer.company}
        </CenteredWithIcon>
      )}
      {viewer.location && (
        <CenteredWithIcon IconComponent={GoLocation}>
          {viewer.location}
        </CenteredWithIcon>
      )}
      {viewer.public_repos && (
        <CenteredWithIcon IconComponent={GoRepo}>
          {viewer.public_repos} repositories
        </CenteredWithIcon>
      )}
      {viewer.followers && (
        <CenteredWithIcon IconComponent={GoOrganization}>
          {viewer.followers} followers
        </CenteredWithIcon>
      )}
    </div>
  </div>
);

export default GithubCard;
