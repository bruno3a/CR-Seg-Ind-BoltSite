import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const productUpdates = [
    {
        name: 'Guantes de seguridad',
        updates: {
            brand: '3M',
            industry: 'CONSTRUCCION',
            category: 'Protección Manual',
            características: 'Guantes de seguridad resistentes a cortes y abrasión',
            especificaciones: 'Material: Nitrilo, Tallas disponibles: M, L, XL',
            presentación: 'Par',
            documentación: 'https://www.3m.com/guantes-seguridad-spec.pdf'
        }
    },
    {
        name: 'Botas de seguridad',
        updates: {
            brand: 'STEELPRO',
            industry: 'CONSTRUCCION',
            category: 'Calzado de Seguridad',
            características: 'Botas con punta de acero y suela antideslizante',
            especificaciones: 'Puntera: Acero, Tallas: 38-45, Resistencia: 200J',
            presentación: 'Par en caja individual',
            documentación: 'https://www.steelpro.com/botas-spec.pdf'
        }
    },
    {
        name: 'Casco de seguridad',
        updates: {
            brand: 'LIBUS',
            industry: 'CONSTRUCCION',
            category: 'Protección de Cabeza',
            características: 'Casco de seguridad clase A tipo 1',
            especificaciones: 'Material: Polietileno de alta densidad, Ajuste: Tipo Ratchet',
            presentación: 'Unidad en caja individual',
            documentación: 'https://www.libus.com/casco-spec.pdf'
        }
    },
    {
        name: 'Mameluco',
        updates: {
            brand: 'LAKELAND',
            industry: 'MANUFACTURA',
            category: 'Indumentaria de Protección',
            características: 'Mameluco de protección química y contra partículas',
            especificaciones: 'Material: Tyvek, Tallas: S-XXL, Tipo: 5/6',
            presentación: 'Unidad en bolsa individual',
            documentación: 'https://www.lakeland.com/mameluco-spec.pdf'
        }
    },
    {
        name: 'Pinza para bloqueo',
        updates: {
            brand: 'DPS',
            industry: 'ELECTRICA',
            category: 'Seguridad Eléctrica',
            características: 'Pinza de bloqueo dieléctrica para lockout/tagout',
            especificaciones: 'Material: Nylon reforzado, Apertura máxima: 25mm',
            presentación: 'Unidad en blister',
            documentación: 'https://www.dps.com/pinza-spec.pdf'
        }
    }
];

const updateProductCategories = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        for (const productUpdate of productUpdates) {
            const result = await Product.updateOne(
                { name: productUpdate.name },
                { $set: productUpdate.updates }
            );
            
            console.log(`Updated ${productUpdate.name}: ${result.modifiedCount} document(s) modified`);
        }

        console.log('Products updated successfully');
    } catch (error) {
        console.error('Error updating products:', error);
    } finally {
        await mongoose.disconnect();
    }
};

updateProductCategories();