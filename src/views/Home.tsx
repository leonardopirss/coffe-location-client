import { useEffect, useState } from "react"
import { Header } from "../components/Header"
import api from "../api";
import { Card } from "../components/Card";
import { type CardI } from "../Interface/interface";
import MyDropdown from "../components/DropdownComponent";

export function Home() {
    const [listCoffe, setCoffe] = useState<CardI[]>([])
    const [latitude, setLatitude] = useState<number>()
    const [longitude, setLongitude] = useState<number>()

    useEffect(() => {
        api
            .get("/list")
            .then((response: any) => {
                setCoffe(response.data)
            })
            .catch((err) => {
                console.error("erro ao carregar lista" + err);
            });
    }, []);

    const listBestCoffe = () => {
        api
            .get("/list/best-coffe")
            .then((response: any) => {
                setCoffe(response.data)
            })
            .catch((err) => {
                console.error("erro ao carregar lista de melhores cafés" + err);
            });
    }

    const list = () => {
        api
            .get("/list")
            .then((response: any) => {
                setCoffe(response.data)
            })
            .catch((err) => {
                console.error("erro ao carregar lista de melhores cafés" + err);
            });
    }

    const closest = () => {
        api.get("/closest/coffe", {
            params: {
                latitude, longitude
            }
        }).then((response: any) => {
            setCoffe(response.data)
        }).catch((err) => {
            console.error("erro ao carregar lista de melhores cafés" + err);
        });
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude)
                    setLongitude(position.coords.longitude)
                },
                (error) => {
                    console.error("Erro ao obter localização:", error.message);
                }
            );
        }
    }, []);

    return (
        <>
            <Header />
            <MyDropdown optionOne={listBestCoffe} optionTwo={list} optionThree={closest} />
            <div style={{  display: 'flex', flexWrap: 'wrap' }}>
                {listCoffe.map((item: CardI, index: number) => (
                    <Card
                        key={index}
                        name={item.name}
                        image={item.image}
                        adress={item.adress}
                        uf={item.uf}
                        municipality={item.municipality}
                        assessment={item.assessment}
                        description={item.description}
                    />
                ))}
            </div>
        </>
    )
}