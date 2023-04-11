import notFound from "../../Images/404.svg"

function Unauthorized() {
    return(
        <section className="flex-column flex-column--center">
            <img src={notFound} alt="404: Not Found" />
            <h1>Sorry, we couldn't find what you were looking for.</h1>
        </section>
    )
}

export default Unauthorized