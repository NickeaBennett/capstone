import React from "react";
import { Box } from "@mui/material";
import FeedCard from "./FeedCard";
import { useState, useEffect } from "react";
import ProjectForm from "../forms/ProjectForm"
import { Project } from "../../../types/data";
import axios from "axios";

const Feed = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [isUpdate, setUpdate] = useState<boolean>(false)

  useEffect(() => {
    getProjects()
    setUpdate(false)
  }, [isUpdate])

  const getProjects = async () => {
    try {
      const response = await axios
        .get('/projects')

      const data = response.data

      setProjects(data.reverse())

    } catch (error: any) {
      console.log(error)
    }
  }

  const updateFeed = (project: Project) => {
    const _projects = projects;
    _projects.unshift(project);
    setProjects(_projects);

    setUpdate(true)
  }

  return (
    <Box flex={4} p={2}>
      {/* <ProjectForm updateFeed={updateFeed} /> */}
      {projects.map((project: Project) => (
        <FeedCard
          key={project.id}
          project_name={project.project_name}
          project_description={project.project_description}
          image_url={project.image_url}
          project_website_url={project.project_website_url}
          project_discord_url={project.project_discord_url}
          project_twitter_url={project.project_twitter_url}
          project_opensea_url={project.project_opensea_url}
          project_max_supply={project.project_max_supply}
          project_sale_date={project.project_sale_date}
          project_unit_price_eth={project.project_unit_price_eth}
          minting_contract_address={project.minting_contract_address}
          project_blockchain={project.project_blockchain}
        />
      ))}
    </Box>
  );
}

export default Feed;
