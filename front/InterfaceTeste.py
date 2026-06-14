import customtkinter as ctk

janela = ctk.CTk()

ctk.set_appearance_mode("dark")
janela.title("Dashboard Alfabetizados")
janela.geometry("1000x600")
janela.resizable(width=False, height=False)

lab = ctk.CTkLabel(janela, text="Gerador de tabelas Dinâmicas", width=200, height=30, font=("Arial Bold", 30))
lab.pack(pady=10)

# PRINCIPAL
container = ctk.CTkFrame(janela, fg_color="transparent")
container.pack(fill="x", padx=15, pady=(0, 10))

FRAME_WIDTH = 306  
FRAME_HEIGHT = 400

# da esquerda
frame1 = ctk.CTkFrame(container, corner_radius=10, fg_color=("#2b2b2b", "#2b2b2b"),
                       width=FRAME_WIDTH, height=FRAME_HEIGHT)
frame1.grid(row=0, column=0, padx=(0, 8), pady=0, sticky="n")
frame1.pack_propagate(False)

label1 = ctk.CTkLabel(frame1, text="Escolha os Estados", font=("Arial Bold", 22))
label1.pack(pady=(12, 6))

# exemplo ainda de dados, posteriormente vir com comandos e funções
labe=ctk.CTkLabel(frame1,text="Estado 1",width=200,height=30,font=("arial bold",16))
labe.pack(pady=10)

estado1=ctk.CTkOptionMenu(frame1,values=["paraiba","amapa","goias"])
estado1.pack(pady=10)
estado1.set("escolha um Estado")

labe1=ctk.CTkLabel(frame1,text="Estado 2",width=200,height=30,font=("arial bold",16))
labe1.pack(pady=10)

estado2=ctk.CTkOptionMenu(frame1,values=["paraiba","amapa","goias"])
estado2.pack(pady=10)
estado2.set("escolha o segundo Estado")


# do meio
frame2 = ctk.CTkFrame(container, corner_radius=10, fg_color=("#2b2b2b", "#2b2b2b"),
                       width=FRAME_WIDTH, height=FRAME_HEIGHT)
frame2.grid(row=0, column=1, padx=4, pady=0, sticky="n")
frame2.pack_propagate(False)

label2 = ctk.CTkLabel(frame2, text="Qual dado Comparar?", font=("Arial Bold", 22))
label2.pack(pady=(12, 6))

# 
tdado=ctk.CTkOptionMenu(frame2,values=["no_alfabetizando","sexo","idade","raca_cor","zona,situacao"])
tdado.pack(pady=10)
tdado.set("tipo dado")

# direita
frame3 = ctk.CTkFrame(container, corner_radius=10, fg_color=("#2b2b2b", "#2b2b2b"),
                       width=FRAME_WIDTH, height=FRAME_HEIGHT)
frame3.grid(row=0, column=2, padx=(8, 0), pady=0, sticky="n")
frame3.pack_propagate(False)

label3 = ctk.CTkLabel(frame3, text="Escolha o tipo de gráfico", font=("Arial Bold", 22))
label3.pack(pady=(12, 6))

# 
tabela=ctk.CTkOptionMenu(frame3,values=["no_alfabetizando","sexo","idade","raca_cor","zona,situacao"])
tabela.pack(pady=10)
tabela.set("tipo tabela")
#
ctk.CTkButton(janela,text="Gerar!",width=200).pack(pady=10)

container.columnconfigure(0, weight=1)
container.columnconfigure(1, weight=1)
container.columnconfigure(2, weight=1)


janela.mainloop()