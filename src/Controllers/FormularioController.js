import mongoose from 'mongoose';
import multer from 'multer';

// Configura multer para manejar form-data
const upload = multer();

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

// Endpoint para guardar el formulario
export const saveFormulario = async (req, res) => {
    try {
        // Verificar si multer se utilizó para manejar form-data
        const body = req.body && typeof req.body === 'object' ? req.body : req.body;

        // Crear un nuevo objeto con los datos del formulario
        const nuevoFormulario = new FormularioModel({
            nombreCompleto: body.nombreCompleto,
            direccion: body.direccion,
            numeroTelefono: body.numeroTelefono,
            correoElectronico: body.correoElectronico,
            edad: body.edad,
            estadoCivil: body.estadoCivil,
            tipoVivienda: body.tipoVivienda,
            propietarioInquilino: body.propietarioInquilino,
            tamanoVivienda: body.tamanoVivienda,
            patioJardinSeguro: body.patioJardinSeguro,
            numeroPersonas: body.numeroPersonas,
            edadesPersonas: body.edadesPersonas,
            otrosAnimales: body.otrosAnimales,
            alergiasMascotas: body.alergiasMascotas,
            haTenidoMascotas: body.haTenidoMascotas,
            detallesMascotasAnteriores: body.detallesMascotasAnteriores,
            cuidadoEntrenamiento: body.cuidadoEntrenamiento,
            razonesAdopcion: body.razonesAdopcion,
            expectativasMascota: body.expectativasMascota
        });

        // Guardar el formulario en la base de datos
        await nuevoFormulario.save();
        
        // Responder con un mensaje de éxito
        return res.status(200).json({ status: true, message: 'Datos guardados exitosamente' });
    } catch (error) {
        // Manejar cualquier error y responder con un mensaje de error
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
