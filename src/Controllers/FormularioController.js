import mongoose from 'mongoose';

const formularioSchema = new mongoose.Schema({
    nombreCompleto: String,
    direccion: String,
    numeroTelefono: String,
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
        const formData = req.body;
        const nuevoFormulario = new FormularioModel(formData);
        await nuevoFormulario.save();
        return res.status(200).json({ status: true, message: 'Datos guardados exitosamente' });
    } catch (error) {
        return res.status(500).json({ status: false, errors: [error.message] });
    }
};

export const updateFormulario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombreCompleto, direccion, numeroTelefono, edad, estadoCivil, tipoVivienda, propietarioInquilino, tamanoVivienda, patioJardinSeguro, numeroPersonas, edadesPersonas, otrosAnimales, alergiasMascotas, haTenidoMascotas, detallesMascotasAnteriores, cuidadoEntrenamiento, razonesAdopcion, expectativasMascota } = req.body;

        const formulario = await FormularioModel.findByIdAndUpdate(id, {
            nombreCompleto,
            direccion,
            numeroTelefono,
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
