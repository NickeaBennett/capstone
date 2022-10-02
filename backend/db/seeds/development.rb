if Doorkeeper::Application.count.zero?
  Doorkeeper::Application.create!(name: 'React Client', redirect_uri: '', scopes: '')
end

User.first_or_create(email: 'nickea@example.com',
                     password: 'password',
                     password_confirmation: 'password',
                     role: User.roles[:admin])

project = Project.create([
  { 
    project_name: 'Bored Apes',
    project_description: 'Bored Apes nft collection',
    image_url: "https://images.app.goo.gl/8CHFdA4uWemW5EGw8",
    project_website_url: 'https://boredapeyachtclub.com/',
    project_discord_url: 'https://discord.com/invite/boredapeyachtclub',
    project_twitter_url: 'https://twitter.com/boredapeyacht',
    project_opensea_url: 'https://opensea.io/collection/boredapeyachtclub',
    project_max_supply: 10_000,
    project_unit_price_eth: 0.1,
    project_sale_date: '2021-10-01 00:00:00',
    minting_contract_address: '0x1a92f7381b9f03921564a437210bb9396471050c',
    project_blockchain: 'Ethereum',
    user_id: 1
  }, 
  { 
    project_name: 'CryptoPunks',
    project_description: 'CryptoPunks nft collection',
    image_url: 'https://images.app.goo.gl/SfjL4EDLupQgvpww6',
    project_website_url: 'https://www.larvalabs.com/cryptopunks',  
    project_discord_url: 'https://discord.com/invite/cryptopunks',
    project_twitter_url: 'https://twitter.com/cryptopunksnot',
    project_opensea_url: 'https://opensea.io/collection/cryptopunks',
    project_max_supply: 10_000,
    project_unit_price_eth: 0.1,
    project_sale_date: '2021-10-01 00:00:00',
    minting_contract_address: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
    project_blockchain: 'Ethereum',
    user_id: 1
  }
])

review = Review.create([
  {
    title: 'Bored Apes are the best',
    description: 'Bored Apes are the best',
    score: 5,
    project_id: 1,
    user_id: 1
  },
  {
    title: 'CryptoPunks are the best',
    description: 'CryptoPunks are the best',
    score: 5,
    project_id: 2,
    user_id: 1
  }
])