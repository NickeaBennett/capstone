import { Box, Stack, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import FeedCard from "./FeedCard";
// import { useEffect, useState } from "react";
import Axios from "../../api/axios";

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [getProject, setProject] = useState([]);

  useEffect(() => {
    Axios.get("/projects")
      .then((res) => {
        setProject(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  setTimeout(() => {
    setLoading(false);
  }, [3000]);

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        <>
          {getProject.map((project) => (
            <FeedCard
              key={project.id}
              projectName={project.project_name}
              projectDesc={project.project_description}
              imageUrl={project.image_url}
              websiteUrl={project.project_website_url}
              discordUrl={project.project_discord_url}
              twitterUrl={project.project_twitter_url}
              openseaUrl={project.project_opensea_url}
              maxSupply={project.project_max_supply}
              saleDate={project.project_sale_date}
              unitPriceEth={project.project_unit_price_eth}
              mintingContractAddress={project.minting_contract_address}
              projectBlockchain={project.project_blockchain}
            />
          ))}
        </>
        // console.log(project.project_blockchain)
      )}
    </Box>
  );
};

export default Feed;

// import React from "react";
// import { Box } from "@mui/material";
// import FeedCard from "./FeedCard";
// import { useState, useEffect } from "react";
// // import { IProject } from "../../../types/data";
// import axios from "axios";

// export const Feed = () => {
//   const [projects, setProjects] = useState<IProject[]>([])
//   const [isUpdate, setUpdate] = useState<boolean>(false)

//   useEffect(() => {
//     getProjects()
//     setUpdate(false)
//   }, [isUpdate])

//   const getProjects = async () => {
//     try {
//       const response = await axios
//         .get('/projects')

//       const data = response.data

//       setProjects(data.reverse())

//     } catch (error: any) {
//       console.log(error)
//     }
//   }

//   // const updateFeed = (project: IProject) => {
//   //   const _projects = projects;
//   //   _projects.unshift(project);
//   //   setProjects(_projects);

//   //   setUpdate(true)
//   // }

//   return (
//     <Box flex={4} p={2}>
//       {/* Fix update feed and project form */}
//       {/* <ProjectForm updateFeed={updateFeed} /> */}
//       {/* {projects.map((project: IProject) => ( */}
//       {projects.map((project: IProject) => (
//         <FeedCard
//           key={project.id}
//           project_name={project.project_name}
//           project_description={project.project_description}
//           image_url={project.image_url}
//           project_website_url={project.project_website_url}
//           project_discord_url={project.project_discord_url}
//           project_twitter_url={project.project_twitter_url}
//           project_opensea_url={project.project_opensea_url}
//           project_max_supply={project.project_max_supply}
//           project_sale_date={project.project_sale_date}
//           project_unit_price_eth={project.project_unit_price_eth}
//           minting_contract_address={project.minting_contract_address}
//           project_blockchain={project.project_blockchain}
//         />
//       ))}
//     </Box>
//   )
// }
