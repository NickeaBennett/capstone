import axios from "axios";
import { Project } from "../../../types/data";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const ProjectForm = (props: { updateFeed: (project: Project) => void; }) => {
    const [project_name, setProjectName] = useState<string>('')
    const [project_description, setProjectDescription] = useState<string>('')
    const [image_url, setImageUrl] = useState<string>('')
    const [project_website_url, setWebsiteUrl] = useState<string>('')
    const [project_discord_url, setDiscordUrl] = useState<string>('')
    const [project_twitter_url, setTwitterUrl] = useState<string>('')
    const [project_opensea_url, setOpenseaUrl] = useState<string>('')
    const [project_max_supply, setProjectMaxSupply] = useState<number>(1)
    const [project_sale_date, setProjectSaleDate] = useState<number>(1)
    const [project_unit_price_eth, setProjectUnitPriceEth] = useState<number>(1)
    const [minting_contract_address, setMintingContractAddress] = useState<number>(1)
    const [project_blockchain, setProjectBlockchain] = useState<number>(1)

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async () => {
        const projectData: Project = {
            project_name,
            project_description,
            image_url,
            project_website_url,
            project_discord_url,
            project_twitter_url,
            project_opensea_url,
            project_max_supply,
            project_sale_date,
            project_unit_price_eth,
            minting_contract_address,
            project_blockchain
        }

        try {
            const response = await axios
                .post('/projects', { project: projectData })

            props.updateFeed(response.data)

        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control
                        {...register("project_name", { required: true })}
                        type="text"
                        name="project_name"
                        onChange={e => setProjectName(e.target.value)}
                    />
                    {errors?.project_name?.type === "required" && <p>This field is required</p>}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Project Description</Form.Label>
                    <Form.Control
                        {...register("projectDescription", { required: true })}
                        type="text"
                        name="projectDescription"
                        onChange={e => setProjectDescription(e.target.value)}
                    />
                    {errors?.projectDescription?.type === "required" && <p>This field is required</p>}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Project Description</Form.Label>
                    <Form.Control
                        {...register("image", { required: true })}
                        type="text"
                        name="image"
                        onChange={e => setImageUrl(e.target.value)}
                    />
                    {errors?.image?.type === "required" && <p>This field is required</p>}
                </Form.Group><br />

                <Button variant="primary" type="submit">
                    Submit
                </Button><hr />
            </Form>
        </>
    )
}
export default ProjectForm