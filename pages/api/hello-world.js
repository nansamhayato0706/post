export async function getServerSideProps(context) {
  try {
    const host = context.req.headers.host || "localhost:3000";
    const protocol = /^localhost/.test(host) ? "http" : "https";
    const products = await fetch(`${protocol}://${host}/api/products`).then(
      (data) => data.json()
    );
    return {
      props: {
        products,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        products: [],
      },
    };
  }
}
