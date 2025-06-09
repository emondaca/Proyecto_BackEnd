export const reportarConsulta = async (req, res, next) => {
    const parametros = req.query;
    const url = req.url;
    const method = req.method;
    console.log(`
    Hoy ${new Date()}
    Se ha recibido una consulta en la ruta ${url} (${method})`)
    next()
}