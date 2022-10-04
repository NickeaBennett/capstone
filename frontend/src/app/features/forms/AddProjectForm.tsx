import axios from "axios";
import { IProject } from "../../../types/data";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Alert, Card, CardContent, Container, Typography } from "@mui/material";


// const AddProjectForm = (props: { updateFeed: (project: IProject) => void; }) => {
const AddProjectForm = () => {
    const [project_name, setProjectName] = useState<string>('')
    const [project_description, setProjectDescription] = useState<string>('')
    const [image_url, setImageUrl] = useState<string>('')
    const [project_website_url, setWebsiteUrl] = useState<string>('')
    const [project_discord_url, setDiscordUrl] = useState<string>('')
    const [project_twitter_url, setTwitterUrl] = useState<string>('')
    const [project_opensea_url, setOpenseaUrl] = useState<string>('')
    const [project_max_supply, setProjectMaxSupply] = useState<string>('')
    const [project_sale_date, setProjectSaleDate] = useState<string>('')
    const [project_unit_price_eth, setProjectUnitPriceEth] = useState<string>('')
    const [minting_contract_address, setMintingContractAddress] = useState<string>('')
    const [project_blockchain, setProjectBlockchain] = useState<string>('')

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async () => {
        const projectData: IProject = {
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

            // props.updateFeed(response.data)

        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <section style={{ marginTop: "2em" }}>
            <Container maxWidth="md">
                <Card sx={{ boxShadow: 1, maxWidth: 'md' }}>
                    <CardContent>
                        <Container maxWidth="sm">
                            <Typography variant="h2" color="text.primary" gutterBottom>
                                Add Your Project
                            </Typography>
                            {/* {errors.length > 0 ?
                                <Alert severity="error" aria-live="assertive">
                                    {errors.map((error, index) => {
                                        return <p key={`alert-${index}`}>
                                            {error}
                                        </p>
                                    })}
                                </Alert>
                                : <></>} */}
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
                                    <Form.Label>Project Images</Form.Label>
                                    <Form.Control
                                        {...register("image", { required: true })}
                                        type="text"
                                        name="image"
                                        onChange={e => setImageUrl(e.target.value)}
                                    />
                                    {errors?.image?.type === "required" && <p>This field is required</p>}
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Project Website URL</Form.Label>
                                    <Form.Control
                                        {...register("website_url", { required: true })}
                                        type="text"
                                        name="website_url"
                                        onChange={e => setWebsiteUrl(e.target.value)}
                                    />
                                    {errors?.website_url?.type === "required" && <p>This field is required</p>}
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Project Discord URL</Form.Label>
                                    <Form.Control
                                        {...register("discord_url", { required: true })}
                                        type="text"
                                        name="discord_url"
                                        onChange={e => setDiscordUrl(e.target.value)}
                                    />
                                    {errors?.discord_url?.type === "required" && <p>This field is required</p>}
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Project Twitter URL</Form.Label>
                                    <Form.Control
                                        {...register("twitter_url", { required: true })}
                                        type="text"
                                        name="twitter_url"
                                        onChange={e => setTwitterUrl(e.target.value)}
                                    />
                                    {errors?.twitter_url?.type === "required" && <p>This field is required</p>}
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Project Opensea URL</Form.Label>
                                    <Form.Control
                                        {...register("opensea_url", { required: true })}
                                        type="text"
                                        name="opensea_url"
                                        onChange={e => setOpenseaUrl(e.target.value)}
                                    />
                                    {errors?.opensea_url?.type === "required" && <p>This field is required</p>}
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Project Max Supply</Form.Label>
                                    <Form.Control
                                        {...register("max_supply", { required: true })}
                                        type="integer"
                                        name="max_supply"
                                        onChange={e => setProjectMaxSupply(e.target.value)}
                                    />
                                    {errors?.max_supply?.type === "required" && <p>This field is required</p>}
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Project Sale Date</Form.Label>
                                    <Form.Control
                                        {...register("sale_date", { required: true })}
                                        type="text"
                                        name="sale_date"
                                        onChange={e => setProjectSaleDate(e.target.value)}
                                    />
                                    {errors?.sale_date?.type === "required" && <p>This field is required</p>}
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Project Unit Price</Form.Label>
                                    <Form.Control
                                        {...register("unit_price", { required: true })}
                                        type="text"
                                        name="unit_price"
                                        onChange={e => setProjectUnitPriceEth(e.target.value)}
                                    />
                                    {errors?.unit_price?.type === "required" && <p>This field is required</p>}
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Project Contract Address</Form.Label>
                                    <Form.Control
                                        {...register("contract_address", { required: true })}
                                        type="text"
                                        name="contract_address"
                                        onChange={e => setMintingContractAddress(e.target.value)}
                                    />
                                    {errors?.contract_address?.type === "required" && <p>This field is required</p>}
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Project Blockchain</Form.Label>
                                    <Form.Control
                                        {...register("blockchain", { required: true })}
                                        type="text"
                                        name="blockchain"
                                        onChange={e => setProjectBlockchain(e.target.value)}
                                    />
                                    {errors?.blockchain?.type === "required" && <p>This field is required</p>}
                                </Form.Group>

                                <br />

                                <Button variant="primary" type="submit">
                                    Add Project
                                </Button><hr />
                            </Form>
                        </Container>
                    </CardContent>
                </Card>
            </Container>

        </section>
    )

}
export default AddProjectForm