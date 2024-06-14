import mongoose from 'mongoose';

const formularioSchema = new mongoose.Schema({
    nombreCompleto: String,
    direccion: String,
    numeroTelefono: String,
    correoElectronico: String,
    edad: Number,
    estadoCivil: String,
    tipoVivienda: String,
    propietarioInquilino: String,
    tamanoVivienda: String,
    patioJardinSeguro: String,
    numeroPersonas: Number,
    edadesPersonas: String,
    otrosAnimales: String,
    alergiasMascotas: String,
    haTenidoMascotas: String,
    detallesMascotasAnteriores: String,
    cuidadoEntrenamiento: String,
    razonesAdopcion: String,
    expectativasMascota: String
}, { versionKey: false });

const FormularioModel = mongoose.model('Formulario', formularioSchema);

export const getFormulario = async (req, res) => {
    try {
        const formularios = await FormularioModel.find();
        return res.status(200).json({ status: true, data: formularios });
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error.message] });
    }
};

export const saveFormulario = async (req, res) => {
    try {
        // Extrae los campos del formulario de req.body
        const { body } = req;

        // Crea un nuevo objeto con los datos del formulario
        const nuevoFormulario = new FormularioModel({
            nombreCompleto: body.get('nombreCompleto'),
            direccion: body.get('direccion'),
            numeroTelefono: body.get('numeroTelefono'),
            correoElectronico: body.get('correoElectronico'),
            edad: body.get('edad'),
            estadoCivil: body.get('estadoCivil'),
            tipoVivienda: body.get('tipoVivienda'),
            propietarioInquilino: body.get('propietarioInquilino'),
            tamanoVivienda: body.get('tamanoVivienda'),
            patioJardinSeguro: body.get('patioJardinSeguro'),
            numeroPersonas: body.get('numeroPersonas'),
            edadesPersonas: body.get('edadesPersonas'),
            otrosAnimales: body.get('otrosAnimales'),
            alergiasMascotas: body.get('alergiasMascotas'),
            haTenidoMascotas: body.get('haTenidoMascotas'),
            detallesMascotasAnteriores: body.get('detallesMascotasAnteriores'),
            cuidadoEntrenamiento: body.get('cuidadoEntrenamiento'),
            razonesAdopcion: body.get('razonesAdopcion'),
            expectativasMascota: body.get('expectativasMascota')
        });

        // Guarda el formulario en la base de datos
        await nuevoFormulario.save();
        
        // Responde con un mensaje de éxito
        return res.status(200).json({ status: true, message: 'Datos guardados exitosamente' });
    } catch (error) {
        // Maneja cualquier error y responde con un mensaje de error
        return res.status(500).json({ status: false, errors: [error.message] });
    }
};



export const updateFormulario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreCompleto, direccion, numeroTelefono, correoElectronico, edad, estadoCivil, tipoVivienda, propietarioInquilino, tamanoVivienda, patioJardinSeguro, numeroPersonas, edadesPersonas, otrosAnimales, alergiasMascotas, haTenidoMascotas, detallesMascotasAnteriores, cuidadoEntrenamiento, razonesAdopcion, expectativasMascota } = req.body;

        const formulario = await FormularioModel.findByIdAndUpdate(id, {
            nombreCompleto,
            direccion,
            numeroTelefono,
            correoElectronico,
            edad,
            estadoCivil,
            tipoVivienda,
            propietarioInquilino,
            tamanoVivienda,
            patioJardinSeguro,
            numeroPersonas,
            edadesPersonas,
            otrosAnimales,
            alergiasMascotas,
            haTenidoMascotas,
            detallesMascotasAnteriores,
            cuidadoEntrenamiento,
            razonesAdopcion,
            expectativasMascota
        });
        
        if (!formulario) {
            return res.status(404).json({ status: false, errors: "Formulario no encontrado" });
        }

        return res.status(200).json({ status: true, message: 'Datos actualizados exitosamente' });
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error.message] });
    }
};


export const deleteFormulario = async (req, res) => {
    try {
        const { id } = req.params;

        const formulario = await FormularioModel.findByIdAndDelete(id);
        if (!formulario) {
            return res.status(404).json({ status: false, errors: "Formulario no encontrado" });
        }

        return res.status(200).json({ status: true, message: 'Datos eliminados exitosamente' });
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error.message] });
    }
};



const validar = (formData) => {
    const errors = [];
    if (!formData.nombreCompleto) {
        errors.push('El nombre completo es requerido');
    }
    // Validar otros campos según sea necesario
    return errors;
};
