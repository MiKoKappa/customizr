import React, { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, ContactShadows, Environment } from '@react-three/drei'
import { SwatchesPicker   } from 'react-color'
import { GitHub } from 'react-feather'
import {motion, AnimatePresence} from 'framer-motion'

export function Model({colors, setHovered, setSelected}) {
    const group = useRef()
    const { nodes, materials } = useGLTF('%PUBLIC_URL%/model.glb')
    
    
    return (
      <group ref={group} dispose={null}
        onPointerOver={(e)=>{e.stopPropagation(); setHovered(e.object.material.name)}}
        onPointerOut={(e)=>{e.intersections.length===0 && setHovered("")}}
        onClick={(e)=>{e.stopPropagation(); e.object? setSelected(e.object.material.name):setSelected(null)}}
      >
        <mesh geometry={nodes.buttons.geometry} material={materials.buttons} material-color={colors.buttons} position={[0.3,-3,0]}/>
        <mesh geometry={nodes.flap_inner.geometry} material={materials.flap_inner} material-color={colors.flap_inner} position={[0.3,-3,0]}/>
        <mesh geometry={nodes.rings_small.geometry} material={materials.rings_small} material-color={colors.rings_small} position={[0.3,-3,0]}/>
        <mesh geometry={nodes.holder_long.geometry} material={materials.holder_long} material-color={colors.holder_long} position={[0.3,-3,0]}/>
        <mesh geometry={nodes.holder_short.geometry} material={materials.holder_short} material-color={colors.holder_short} position={[0.3,-3,0]}/>
        <mesh geometry={nodes.flap_side.geometry} material={materials.flap_side} material-color={colors.flap_side} position={[0.3,-3,0]}/>
        <mesh geometry={nodes.rings.geometry} material={materials.rings} material-color={colors.rings} position={[0.3,-3,0]}/>
        <mesh geometry={nodes.outside_bag.geometry} material={materials.outside_bag} material-color={colors.outside_bag} position={[0.3,-3,0]}/>
        <mesh geometry={nodes.buckles.geometry} material={materials.buckles} material-color={colors.buckles} position={[0.3,-3,0]}/>
        <mesh geometry={nodes.loops.geometry} material={materials.loops} material-color={colors.loops} position={[0.3,-3,0]}/>
        <mesh geometry={nodes.flap_out.geometry} material={materials.flap_out} material-color={colors.flap_out} position={[0.3,-3,0]}/>
        <mesh geometry={nodes.top.geometry} material={materials.top} material-color={colors.top} position={[0.3,-3,0]}/>
        <mesh geometry={nodes.bag.geometry} material={materials.bag} material-color={colors.bag} position={[0.3,-3,0]}/>
      </group>
    )
  }

export default function App() {
    const [colors, setColors] = useState({
        buttons: '#c3c3c3',
        flap_inner: '#afafaf',
        rings_small: '#9f9f9f',
        holder_long: '#ffffff',
        holder_short: '#989898',
        flap_side: '#e2e2e2',
        rings: '#7f7f7f',
        outside_bag: '#c5c5c5',
        buckles: '#afafaf',
        loops: '#8d8d8d',
        flap_out: '#d3d3d3',
        top: '#e8e8e8',
        bag: '#dfdfdf',
    });
    const [hovered, setHovered] = useState(null);
    const [selected, setSelected] = useState(null);
  return (
    <>
    <motion.h1 style={{position:'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)'}} animate={{opacity: 0, transition:{delay: 1.5}}}>CUSTOMIZr</motion.h1>
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2}} style={{position: 'absolute', zIndex: 3, padding: '2rem 3rem'}}>
        <h1 style={{userSelect:'none'}}>CUSTOMIZr</h1>
        <AnimatePresence>
            {selected?<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h2>{selected.replace('_',' ').toUpperCase()}</h2>
                <span 
                className='closeButton'
                onClick={()=>setSelected(null)}
                >X</span>
            </div>
            <SwatchesPicker  
            color={ colors[selected] }
            onChangeComplete={(color)=>{setColors({...colors, [selected]:color.hex})}}
            onChange={(color)=>{setColors({...colors, [selected]:color.hex})}}
        />
        </motion.div>:''}
      </AnimatePresence>
      </motion.div>
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 2.5}} style={{position: 'absolute', zIndex: 3, padding:'2rem 3rem', bottom: 0, right: 0, display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
        <a>
            <h3 className="logo">TKACZYK</h3>
        </a>
        <a style={{cursor: 'pointer', marginLeft: '1rem'}} href='https://github.com/MiKoKappa'>
            <GitHub size={24} color='black' />
        </a>
    </motion.div>
    <motion.div initial={{opacity:0}} animate={{opacity: 1}} transition={{delay: 1.5}} style={{height:'100vh'}}>
    <Canvas>
        <OrbitControls minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2} enablePan={false} enableZoom={false} />
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.3} position={[5,15,20]}/>
        <Suspense fallback={null}>
            <Model colors={colors} setHovered={setHovered} setSelected={setSelected} />
            <ContactShadows position={[0, -2.99, 0.2]} opacity={0.09} width={10} blur={2} height={10} far={20} rotation={[Math.PI / 2, 0, 0]} />
            <Environment preset="city"/>
        </Suspense>
    </Canvas>
    </motion.div>
    </>
  )
}
