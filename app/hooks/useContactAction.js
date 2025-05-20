"use client";
import { useContactModal } from '../context/ContactModalContext';

/**
 * Hook para utilizar en botones existentes y así abrir el modal de contacto
 * 
 * Ejemplo de uso:
 * 
 * import { useContactAction } from '../hooks/useContactAction';
 * 
 * function MiComponente() {
 *   const handleContact = useContactAction();
 *   
 *   return <button onClick={handleContact}>Contactar</button>
 * }
 */

export function useContactAction() {
  const { openModal } = useContactModal();
  
  return () => {
    openModal();
  };
}

/**
 * HOC (Higher Order Component) para envolver botones existentes
 * y añadirles la funcionalidad de abrir el modal de contacto
 * 
 * Ejemplo de uso:
 * 
 * import { withContactAction } from '../hooks/useContactAction';
 * 
 * const BotonOriginal = ({onClick, ...props}) => (
 *   <button onClick={onClick} {...props}>Contactar</button>
 * );
 * 
 * const BotonConContacto = withContactAction(BotonOriginal);
 */

export function withContactAction(Component) {
  return function WithContactAction(props) {
    const { openModal } = useContactModal();
    
    const handleClick = (e) => {
      // Llamar al onClick original si existe
      if (props.onClick) {
        props.onClick(e);
      }
      // Abrir el modal
      openModal();
    };
    
    return <Component {...props} onClick={handleClick} />;
  };
}

/**
 * Función para agregar la acción de contacto a cualquier handler existente
 * 
 * Ejemplo de uso:
 * 
 * import { combineWithContactAction } from '../hooks/useContactAction';
 * 
 * function MiComponente() {
 *   const handleMiAccion = () => {
 *     console.log('Mi acción existente');
 *   };
 *   
 *   const handleCombinado = combineWithContactAction(handleMiAccion);
 *   
 *   return <button onClick={handleCombinado}>Acción + Contacto</button>
 * }
 */

export function combineWithContactAction(existingHandler) {
  const { openModal } = useContactModal();
  
  return (e) => {
    // Ejecutar el handler existente
    if (existingHandler) {
      existingHandler(e);
    }
    // Abrir el modal
    openModal();
  };
} 