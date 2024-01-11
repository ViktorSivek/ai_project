export async function GET(request: Request) {
    try {
        const response = await fetch('https://aplikace.policie.cz/dopravni-informace/GetFile.aspx?dt=20240104150101');

        const data = await response.text();
        
        return Response.json({data});
    } catch (error) {
        console.log(error);
        return new Response("Interal error", { status: 500});
    }
};