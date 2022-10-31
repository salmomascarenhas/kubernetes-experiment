import 'dotenv/config'
import { app } from "./app"

app.listen(process.env.PORT, () => console.log(`API is running on PORT ${process.env.PORT}!`))